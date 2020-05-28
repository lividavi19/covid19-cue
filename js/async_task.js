class AsyncTask {
	// constructor method
	constructor (details) {
		this.url = details.url;
		this.method = details.method;
		this.headers = details.headers;
	}

	// execute method
	execute () {
		return new Promise ((resolve, reject) => {
			// create xhr object
			const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

			// open request
			xhr.open(this.method, this.url);

			// set request headers
			for (const i in this.headers) {
				xhr.setRequestHeader(i, this.headers[i]);
			}

			// send request
			xhr.send();

			// on request completion
			xhr.onload = () => {
				if (xhr.status===200) {
					resolve({
						'status': true,
						'data': xhr.responseText
					});
				} else {
					reject({
						'status': false,
						'message': `Error ${xhr.status}: ${xhr.statusText}`,
						'data': xhr
					});
				}
			};

			// on netowrk error
			xhr.onerror = () => {
				reject({
					'status': false,
					'message': `Network error occured while making the request`,
					'data': xhr
				});
			};
		});
	}
}
