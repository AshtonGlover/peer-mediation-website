package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.storage.StorageInterface;
import spark.Request;
import spark.Response;

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

            // get all the words for the user
            List<Map<String, Object>> vals = this.storageHandler.getCollection(uid, "cookies");

            // convert the key,value map to just a list of the words.
            List<String> cookies = vals.stream().map(word -> word.get("cookie").toString()).toList();
            List<String> finalCookies = new ArrayList<>();
            Set<String> cookiesSet = new HashSet<>();
            Map<String, String> cookieToDate = new HashMap<>();

            if (cookies.size() == 0) {
                responseMap.put("response_type", "success");
                responseMap.put("cookies", cookies);
                return responseMap;
            }
            
            for (int i = cookies.size() - 1; i > -1; i--) {
                String[] splitCookie = cookies.get(i).split("@");
                String currCookie = splitCookie[0];
                String dateAndTime = splitCookie[1];
                String[] date = dateAndTime.split(" ")[0].split("-");

                String month = date[0];
                String day = date[1];
                String year = date[2];

                String time = dateAndTime.split(" ")[1];
                String amPm = dateAndTime.split(" ")[2];

                int hour = Integer.parseInt(time.split(":")[0]);
                int minute = Integer.parseInt(time.split(":")[1]);

                if (amPm == "PM") {
                    hour += 12;
                }

                //LocalDateTime dateTime1 = LocalDateTime.of(year, month, day, hour, minute);
                if (!cookiesSet.contains(currCookie)) {
                    cookiesSet.add(currCookie);
                    finalCookies.add(cookies.get(i));
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