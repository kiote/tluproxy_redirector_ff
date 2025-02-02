browser.webRequest.onBeforeRequest.addListener(
    function (requestDetails) {
      try {
        // Parse the current URL
        const url = new URL(requestDetails.url);
  
        // Use a simple list of domain rules
        const domainRules = [
            {
                domain: "www.sciencedirect.com",
                newHost: "www-sciencedirect-com.ezproxy.tlu.ee",
                pathRewrite: { from: "/abs/", to: "/" },
            },
            {
                domain: "ieeexplore.ieee.org",
                newHost: "ieeexplore-ieee-org.ezproxy.tlu.ee",
            },
        ];

        // Apply domain rule transforms
        for (const rule of domainRules) {
            if (url.hostname === rule.domain) {
                url.hostname = rule.newHost;
                if (rule.pathRewrite) {
                    url.pathname = url.pathname.replace(rule.pathRewrite.from, rule.pathRewrite.to);
                }
                return { redirectUrl: url.toString() };
            }
        }
      } catch (error) {
        console.error("Redirect error:", error);
      }
      // If no conditions met, do nothing
      return {};
    },
    // Filter for sciencedirect and ieeexplore
    { urls: ["*://www.sciencedirect.com/*", "*://ieeexplore.ieee.org/*"] },
    // Make sure we can block (redirect) the request
    ["blocking"]
  );
  