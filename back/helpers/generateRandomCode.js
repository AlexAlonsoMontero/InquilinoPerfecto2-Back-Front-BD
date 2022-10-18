const generateRandomString = (num) => {
        var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst';
		var charactersLength = characters.length;
		for ( var i = 0; i < num; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
}

module.exports = generateRandomString