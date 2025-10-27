new Vue({
	el: '#replica-app',
	data: {
		moment: moment
	}
});

// Share copy: copy current URL to clipboard on click/Enter
document.addEventListener('DOMContentLoaded', function() {
	var share = document.getElementById('share-copy');
	if (!share) return;
	function copyUrl() {
		var url = window.location.href;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(url).then(function(){
				share.classList.add('copied');
				setTimeout(function(){ share.classList.remove('copied'); }, 1200);
			}).catch(function(){
				fallbackCopy(url);
			});
		} else {
			fallbackCopy(url);
		}
	}
	function fallbackCopy(text) {
		var input = document.createElement('input');
		input.setAttribute('readonly', '');
		input.value = text;
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
		share.classList.add('copied');
		setTimeout(function(){ share.classList.remove('copied'); }, 1200);
	}
	share.addEventListener('click', copyUrl);
	share.addEventListener('keydown', function(e){
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			copyUrl();
		}
	});
});
