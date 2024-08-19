package edu.brown.cs.student.main.server.handlers;

import java.util.Map;
import spark.Request;

public class OriginVerifier {

  public static boolean isAccessAllowed(Request request, Map<String, Object> responseMap) {
    String origin = request.headers("Origin");
    System.out.println(origin);
    if (origin == null || !origin.equals("https://peer-mediation.github.io")) {
      responseMap.put("access denied", origin + " is an invalid origin");
      return false;
    }
    return true;
  }
}
