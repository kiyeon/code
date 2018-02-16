var express = require("express");
var morgan = require("morgan");
var path = require("path");

var PORT = 3000;
var app = express();

// 첫번째 미들웨어
// console.log를 사용하여 로그를 출력하는 방식에서 Morgan 미들웨어로 대체했다.
// short, combined, tiny등을 사용할 수 있다.
app.use(morgan("combined"));

// 두번째 미들웨어
// Express에 내장된 유일한 정적 파일 미들웨어다. 기본 API로 작성했던 코드가 단 2줄로 간소화됐다.
// path.resolve : OS플랫폼에 따라 경로 구분자를 적절하게 대체한다.(/ or \)
var staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));

app.use(function(req, res, next) {
    res.status(404);
    res.send("File not found!");
});

// 에러 처리 미들웨어
// 에러 처리 미들웨어는 인자수로 구분한다. 즉, err이 붙어 인수가 4개가 되면 에러 처리 미들웨어가 된다. 에러 처리 미들웨어는 try, catch중 catch라고 보면되며 에러 처리 미들웨어가 없시 에러가 발생한다면 상세한 에러 스택이 웹브라우저에 그대로 노출되어 보안상 좋지 않다. 이렇게 에러 처리 미들웨어를 등록해놓으면 콘솔에만 에러 스택이 출력된다.
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500);
    res.send("Internal server error.");
});

app.listen(PORT, function() {
    console.log("App started on port " + PORT);
});
