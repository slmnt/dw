<html>
<head>
</head>
<body>




<style>

</style>

<script>
function dodrop(event){
  var dt = event.dataTransfer;
  var files = dt.files;
  upload(files);
}

function output(text){
  //document.getElementById("output").textContent += text;
  //dump(text);
}
function dragover(e) {
	//console.log(e.target)
}
function dragenter(e) {
	//console.log(e.target)
}

function upload(files) {
	var formData = new FormData();
	var photos = document.querySelector("input[type='file'][multiple]");

	formData.append('test', 'My Vegas Vacation');
	for (var i = 0; i < files.length; i++) {
	  formData.append('photos', files[i]);
	}

	fetch('http://localhost:8000/upload', {
	  method: 'POST',
	  body: formData
	})
	.then(response => response.json())
	.then(response => console.log('Success:', JSON.stringify(response)))
	.catch(error => console.error('Error:', error));
}

</script>
<body>
	
	
	
<div id="output" style="min-height: 200px; white-space: pre; border: 1px solid black;"
 ondragenter="
			  document.getElementById('output').textContent = '';
			  event.stopPropagation();
			  event.preventDefault();
			  dragenter(event);
			  "
 ondragover="
			 event.stopPropagation();
			 event.preventDefault();
			 dragover(event);
			 "
 ondrop="
		 event.stopPropagation();
		 event.preventDefault();
		 dodrop(event);
 ">
 DROP FILES HERE FROM FINDER OR EXPLORER
</div>





</body>
	
</body>
</html>



