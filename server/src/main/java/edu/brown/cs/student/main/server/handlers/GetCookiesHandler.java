package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import spark.Request;
import spark.Response;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

import spark.Route;

public class GetCookiesHandler implements Route {

    public StorageInterface storageHandler;

    public GetCookiesHandler(StorageInterface storageHandler) {
        this.storageHandler = storageHandler;
    }

    @Override
    public Object handle(Request request, Response response) {
        Map<String, Object> responseMap = new HashMap<>();
        try {
            String uid = request.queryParams("uid");

            List<Map<String, Object>> vals = this.storageHandler.getCollection(uid, "cookies");

            List<String> cookies = vals.stream().map(word -> word.get("cookie").toString()).toList();
            List<String> finalCookies = new ArrayList<>();
            Set<String> cookiesSet = new HashSet<>();

            if (cookies.size() == 0) {
                responseMap.put("response_type", "success");
                responseMap.put("cookies", cookies);
                return responseMap;
            }

            for (int i = cookies.size() - 1; i > -1; i--) {
                String currCookie = cookies.get(i);
                String splitCookie = currCookie.split("@")[0];
                if (!cookiesSet.contains(splitCookie)) {
                    cookiesSet.add(splitCookie);
                    finalCookies.add(currCookie);
                }
            }

            System.out.println(finalCookies);

            responseMap.put("response_type", "success");
            responseMap.put("cookies", finalCookies);
        } catch (Exception e) {
            // error likely occurred in the storage handler
            e.printStackTrace();
            responseMap.put("response_type", "failure");
            responseMap.put("error", e.getMessage());
        }

        return Utils.toMoshiJson(responseMap);
    }
}