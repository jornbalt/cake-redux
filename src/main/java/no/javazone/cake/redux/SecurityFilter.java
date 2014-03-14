package no.javazone.cake.redux;

import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

public class SecurityFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        if (Configuration.noAuthMode()) {
            chain.doFilter(req,resp);
            return;
        }
        HttpServletRequest request = (HttpServletRequest) req;
        String token = (String) request.getSession().getAttribute("access_token");
        if (token != null) {
            chain.doFilter(req,resp);
            return;
        }
        resp.setContentType("text/html");
        resp.getWriter().append("You are not logged in. Blocked.");

    }


    @Override
    public void destroy() {

    }
}