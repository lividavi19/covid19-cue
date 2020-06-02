class AsyncRequest {
	// constructor method
	constructor (details) {
		this.url = details.url;
		this.method = details.method.toLowerCase();
		this.data = details.data;
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
			if (this.method === 'post') {
				xhr.send(this.data);
			} else {
				xhr.send();
			}

			// on request completion
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve({
						'status': true,
						'data': xhr.responseText
					});
				} else {
					reject({
						'status': false,
						'data': xhr,
						'message': `Error ${xhr.status}: ${xhr.statusText}`
					});
				}
			};

			// on netowrk error
			xhr.onerror = () => {
				reject({
					'status': false,
					'data': xhr,
					'message': `Network error occured while making the request`
				});
			};
		});
	}
}
