

//save button post 
$('#saveBtn').click(function(){
	const textArea = $('#textArea').val();
	console.log(textArea);
    $.ajax({
      type: 'PUT',
      url: '/',
      data: {text: textArea},
    });
});
