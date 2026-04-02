// proxy.ts
import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Migration to Next.js 16 Proxy layer.
 * This function serves as the request gateway and network boundary.
 */
export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  // Refresh token nếu sắp hết hạn
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Bảo vệ route /dashboard — chưa đăng nhập thì chuyển về /login
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // NẾU đã đăng nhập mà vẫn truy cập /login hoặc /register -> đá về trang trước đó (hoặc trang chủ)
  if (user && (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register")) {
    // const referer = request.headers.get("referer")
    // if (referer) {
    //   // Nhảy ngược lại trang mà user vừa đứng
    //   return NextResponse.redirect(new URL(referer))
    // }
    // Nếu gõ thẳng URL không có referer, cho về trang chủ
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // Chặn truy cập trang thi bằng thẻ Header chuyên dụng (cho phép Client giữ giao diện nhưng Server ngừng tải DB)
  const { pathname } = request.nextUrl
  const isMiniTest = pathname.startsWith('/mock-test/mini/test-')
  const isFullTest = pathname.startsWith('/mock-test/full/test-')
  const isPracticeTest = pathname.startsWith('/practice/part-') && pathname.includes('/test-')
  const isExceptedFullTest = pathname === '/mock-test/full/test-1'

  if (!user && (isMiniTest || (isFullTest && !isExceptedFullTest) || isPracticeTest)) {
    // Đính kèm tín hiệu dừng tải (X-Unauthenticated-Test) vào headers server components
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-unauthenticated-test', 'true')

    // Tạo NextResponse mới mang headers này
    const responseWithHeader = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    // Merge các cookies lại vào responseWithHeader
    const cookiesToSet = request.cookies.getAll()
    cookiesToSet.forEach(({ name, value }) => responseWithHeader.cookies.set(name, value))

    return responseWithHeader
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Chạy trên tất cả route trừ file tĩnh và API nội bộ Next.js
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
