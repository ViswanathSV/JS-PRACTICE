const http = require("http");

const server = http.createServer((req, res) => {
  const users = [{ name: "Viswa" }, { name: "Shree" }];

  if (req.method === "GET" && req.url === "/users") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    return res.end(JSON.stringify(users));
  }

  if (req.method === "POST" && req.url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const user = JSON.parse(body);
      users.push(user);
      res.writeHead(201, {
        "content-type": "application/json",
      });
    });
    return res.end(JSON.stringify(users));
  }
});

server.listen(3000, () => console.log("listening"));
