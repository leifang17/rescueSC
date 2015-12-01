<!DOCTYPE html>
<html>
<head>
    <title>拯救圣诞老人</title>
    <style type="text/css">
        html, body {
            background-color: #000;
            color: #fff;
            margin: 0;
            padding: 0;
            font-size: 12pt;
            position: relative;
            width: 100%;
            height: 100%;
        }

        #canvas {
            image-rendering: optimizeSpeed;
            -webkit-interpolation-mode: nearest-neighbor;
            position: relative;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 0;
            width: 100%;
            height: 100%;
        }

        #game {
            text-align: center;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta charset="UTF-8">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">

    <script type="text/javascript" src="lib/impact/impact.js" charset="utf-8"></script>
    <script type="text/javascript" src="lib/game/main.js<?php echo '?v='.mt_rand(); ?> " charset="utf-8"></script>
</head>
<body onload="window.scrollTo(0,1);">
<div id="game">
    <canvas id="canvas"></canvas>
</div>

<script type="text/javascript">
    window.addEventListener('touchmove', function (e) {
        e.preventDefault();
        window.scrollTo(0, 1);
    }, false);
</script>
</body>
</html>
