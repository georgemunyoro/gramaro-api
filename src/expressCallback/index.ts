const makeExpressCallback = (controller: any) => {
  return async (req: any, res: any) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };

    try {
      const httpResponse = await controller(httpRequest);
      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }
      res.type("json");
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({
        error: "An unknown error ocurred.",
      });
    }
  };
};

export default makeExpressCallback;
