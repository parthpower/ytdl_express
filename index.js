const express = require('express');
const ytdl = require('ytdl-core');
var yts = require('youtube-scrape');

const app = express();

app.get('/', (req,res)=>{
	try{
		let url = decodeURI(req.query.url);
		if(ytdl.validateURL(url)){
			res.setHeader("content-type","audio/aac");
			ytdl(url, {quality: "highestaudio", filter: "audioonly"})
				.pipe(res);
		}else{
			res.send("Oops!");
		}
	}catch (err){
		res.send('Oops!');
	}
});

app.get('/vid', (req,res)=>{
	try{
		let url = decodeURI(req.query.url);
		if(ytdl.validateURL(url,{ filter: (format) => format.container === 'mp4' })){
			res.setHeader("content-type","video/mp4");
			ytdl(url)
				.pipe(res);
		}else{
			res.send("Oops!");
		}
	}catch (err){
		res.send('Oops!');
	}
});


app.get('/search',(req,resp)=>{
	try{
		let query = req.query.q;
		yts(decodeURI(query)).then((data)=>{
			resp.send(data);
		}, (error)=>{
			resp.send('Oops!');
		})
	}catch(err){
		res.send('Oops!');
	}
})

app.listen(process.env.PORT||5000,()=>{
	console.log("Listening to port",process.env.PORT||5000);
});
