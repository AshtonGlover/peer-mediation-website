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
            Map<String, LocalDateTime> cookieToDate = new HashMap<>();
            Map<String, String> cookieToFullCookie = new HashMap<>();

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

                int month = Integer.parseInt(date[0]);
                int day = Integer.parseInt(date[1]);
                int year = Integer.parseInt(date[2]);

                String time = dateAndTime.split(" ")[1];
                String amPm = dateAndTime.split(" ")[2];

                int hour = Integer.parseInt(time.split(":")[0]);
                int minute = Integer.parseInt(time.split(":")[1]);

                if (amPm.equals("PM")) {
                    hour += 12;
                }

                LocalDateTime dateTime1 = LocalDateTime.of(year, month, day, hour, minute);
                if (!cookieToDate.containsKey(currCookie)) {
                    cookieToDate.put(currCookie, dateTime1);
                    cookieToFullCookie.put(currCookie, cookies.get(i));
                } else if (dateTime1.isAfter(cookieToDate.get(currCookie))) {
                    cookieToDate.put(currCookie, dateTime1);
                    cookieToFullCookie.put(currCookie, cookies.get(i));
                }
            }

            for (String cookie: cookieToFullCookie.keySet()) {
                finalCookies.add(cookieToFullCookie.get(cookie));
            }

            if (finalCookies.size() > 1) {
                finalCookies.sort((t1, t2) -> {
                    String t1Cookie = t1.split("@")[0];
                    String t2Cookie = t2.split("@")[0];
                    LocalDateTime time1 = cookieToDate.get(t1Cookie);
                    LocalDateTime time2 = cookieToDate.get(t2Cookie);
                    LocalDateTime comparisonDate = LocalDateTime.of(2026, 1, 1, 11, 59);
                    Duration duration1 = Duration.between(time1, comparisonDate);
                    Duration duration2 = Duration.between(time2, comparisonDate);
                    int t1Seconds = (int) duration1.getSeconds();
                    int t2Seconds = (int) duration2.getSeconds();

                    return t1Seconds - t2Seconds;
                });
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