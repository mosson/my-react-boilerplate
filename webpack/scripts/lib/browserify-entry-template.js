const ejs = require('ejs');
const Template = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8"/>
<meta content="IE=Edge" http-equiv="X-UA-Compatible">
<meta content="width=device-width,user-scalable=no" name="viewport">
<title><%- entry %></title>
<link rel="stylesheet" type="text/css" href="/normalize.css"/>
</head>
<body>
<%- bsScript %>
<div id="app"></div>

<!-- Dependencies -->
<script src="//cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/react/15.5.4/react-dom.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/bluebird/3.5.0/bluebird.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/superagent/3.5.2/superagent.min.js"></script>

<script type="text/javascript" src="/debug/<%- entry %>.js"></script>
</body>
</html>
`;

module.exports = function(bindings) {
  return ejs.render(Template, bindings)
};
