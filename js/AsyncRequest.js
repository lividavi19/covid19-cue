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
			switch (this.method) {
				case 'get':
					xhr.send();
					break;
				case 'post': case 'put': case 'delete':
					xhr.send(this.data);
					break;
				default:
					reject({
						statusOk: false,
						message: `unsuported HTTP method used`
					});
			}

			// on request completion
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve({
						statusOk: true,
						body: xhr.responseText
					});
				} else {
					reject({
						statusOk: false,
						body: xhr,
						message: `error ${xhr.status}: ${xhr.statusText.toLowerCase()}`
					});
				}
			};

			// on request error
			xhr.onerror = () => {
				reject({
					statusOk: false,
					body: xhr,
					message: `an error occured while making the request`
				});
			};
		});
	}
}
