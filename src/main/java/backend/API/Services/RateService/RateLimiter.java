package backend.API.Services.RateService;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;

@Service
public class RateLimiter {
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    public boolean allowRequest(String apiKey) {
        Bucket bucket = buckets.computeIfAbsent(apiKey, this::createNewBucket);
        return bucket.tryConsume(1);
    }

    private Bucket createNewBucket(String apiKey) {
        Bandwidth limit = Bandwidth.classic(10, Refill.smooth(10, Duration.ofMinutes(1)));
        return Bucket4j.builder().addLimit(limit).build();
    }
}
