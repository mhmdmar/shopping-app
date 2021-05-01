export function extractQuery(url) {
    const queryParams = url.split("?")[1];
    if (!queryParams) {
        return null;
    }
    let params = {};
    queryParams.split("&").forEach(item => {
        const [key, value] = item.split("=");
        if (!params[key]) {
            params[key] = value;
        } else {
            if (Array.isArray(params[key])) {
                params[key].push(value);
            } else {
                params[key] = [params[key], value];
            }
        }
    });
    return params;
}
