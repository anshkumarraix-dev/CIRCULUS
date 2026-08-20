for url in $(grep -hoE "https://images.unsplash.com/photo-[a-zA-Z0-9-]+" src/lib/demo-data.ts src/lib/matching-engine.ts | sort | uniq); do 
  status=$(curl -s -o /dev/null -w "%{http_code}" -H "User-Agent: Mozilla/5.0" "$url")
  if [ "$status" = "200" ]; then
    echo "VALID: $url"
  fi
done
