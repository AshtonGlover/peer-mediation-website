package edu.brown.cs.student.main.server.handlers;

import edu.brown.cs.student.main.server.LoginInfo.LoginInfoRetriever;
import edu.brown.cs.student.main.server.storage.StorageInterface;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class VerifyAdminHandler implements Route {

    public StorageInterface storageHandler;

    public VerifyAdminHandler(StorageInterface storageHandler) {
        this.storageHandler = storageHandler;
    }

    @Override
    public Object handle(Request request, Response response) {
        Map<String, Object> responseMap = new HashMap<>();
        if (!OriginVerifier.isAccessAllowed(request, responseMap)) {
            return responseMap;
        }

        try {
            String username = request.queryParams("username");
            String password = request.queryParams("password");

            if (username == null || password == null) {
                responseMap.put("failure", "must specify query parameters");
                return responseMap;
            }

            responseMap.put("isVerified", username.equals(LoginInfoRetriever.username)
                && password.equals(LoginInfoRetriever.password));

        } catch (Exception e) {
            e.printStackTrace();
            responseMap.put("response_type", "failure");
            responseMap.put("error", e.getMessage());
        }

        return Utils.toMoshiJson(responseMap);
    }
}