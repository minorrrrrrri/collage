function previewImage(obj)
{
	var fileReader = new FileReader();
	fileReader.onload = (function() {
		var canvas = document.getElementById('preview');
		var ctx = canvas.getContext('2d');
		var image = new Image();
		image.src = fileReader.result;
		image.onload = (function () {
			canvas.width = 500;
			canvas.height = 300;
			ctx.drawImage(image, 0, 0, 500, 300);
		});
	});
	fileReader.readAsDataURL(obj.files[0]);
}

//キャンバスに文字を描く
function drawText(canvas_id, text_id)
{
	var canvas = document.getElementById(canvas_id);
	var ctx = canvas.getContext('2d');
	var text = document.getElementById(text_id);

	// ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
	// ctx.filiReact(16,16,48,48);

	//文字のスタイルを指定
  ctx.font = '40px serif';
	ctx.fillStyle = '#404040';
	//文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
	ctx.textBaseline = 'center';
	ctx.textAlign = 'center';
	//座標を指定して文字を描く（座標は画像の中心に）
	var x = (canvas.width / 2);
	var y = (canvas.height / 2);
	ctx.fillText(text.value, x, y);
}
function toBlob(base64) {
	var bin = atob(base64.replace(/^.*,/, ''));
	var buffer = new Uint8Array(bin.length);
	for (var i = 0; i < bin.length; i++) {
		buffer[i] = bin.charCodeAt(i);
	}
	var blob = new Blob([buffer.buffer], {type: 'image/png'});
	return blob;
}
//
function saveCanvas(canvas_id)
{
	var canvas = document.getElementById(canvas_id);
	var uri = canvas.toDataURL('image/jpeg', 0.85);
	if (canvas.msToBlob) { //IE対応
		var blob = toBlob(uri);
		window.navigator.msSaveBlob(blob, 'download.jpg');
	} else {
		//アンカータグを作成
		var a = document.createElement('a');
		a.href = uri;
		a.download = 'download.jpg';
		//クリックイベントを発生させる
		a.click();
	}
}




// お絵描き
    var cnvs = document.getElementById('preview');
    var ctx = cnvs.getContext('2d');
 
    // 変数宣言
    const cnvWidth = 500;
    const cnvHeight = 500;
    var cnvColor = "255, 0, 0, 1";  // 線の色
    var cnvBold = 5;  // 線の太さ
    var clickFlg = 0;  // クリック中の判定 1:クリック開始 2:クリック中
    var bgColor = "rgb(255,255,255)";
 
    // canvasの背景色を設定(指定がない場合にjpeg保存すると背景が黒になる)
    setBgColor();
 
    // canvas上でのイベント
    $("#preview").mousedown(function(){
      clickFlg = 1; // マウス押下開始
    }).mouseup(function(){
      clickFlg = 0; // マウス押下終了
    }).mousemove(function(e){
      // マウス移動処理
      if(!clickFlg) return false;
      draw(e.offsetX, e.offsetY);
    });
 
    // 描画処理
    function draw(x, y) {
      ctx.lineWidth = cnvBold;
      ctx.strokeStyle = 'rgba('+cnvColor+')';
      // 初回処理の判定
      if (clickFlg == "1") {
        clickFlg = "2";
        ctx.beginPath();
        ctx.lineCap = "round";  //線を角丸にする
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    };
 
    // 色の変更
    $(".color a").click(function(){
      cnvColor = $(this).data("color");
      return false;
    });
 
    // 線の太さ変更
    $(".bold a").click(function(){
      cnvBold = $(this).data("bold");
      return false;
    });
 
    // // 描画クリア
    $("#clear").click(function(){
      ctx.clearRect(0,0,cnvWidth,cnvHeight);
      setBgColor();
    });
 
    // canvasを画像で保存
    $("#download").click(function(){
      canvas = document.getElementById('preview');
      var base64 = canvas.toDataURL("image/jpeg");
      document.getElementById("download").href = base64;
    });
 
    function setBgColor(){
      // canvasの背景色を設定(指定がない場合にjpeg保存すると背景が黒になる)
      ctx.fillStyle = bgColor;
      ctx.fillRect(0,0,cnvWidth,cnvHeight);
    }