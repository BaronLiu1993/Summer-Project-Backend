package backend.API.Services;

import java.lang.reflect.Method;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component("KeyGeneration")
public class KeyGeneration implements KeyGenerator {
    @Override
    public @NonNull Object generate(@NonNull Object target, @NonNull Method method, @NonNull Object... params) {
        return target.getClass().getSimpleName() + "_"
            + method.getName() + "_"
            + StringUtils.arrayToDelimitedString(params, "_");
    }
}