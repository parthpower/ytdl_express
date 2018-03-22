const express = require('express');
const ytdl = require('ytdl-core');
const yts = require('youtube-scrape/scraper').getYouTubeResults;

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


app.get('/search',(req,res)=>{
	try{
		let query = req.query.q;
		yts(decodeURI(query)).then((data)=>{
			res.send(data);
		}, (error)=>{
			res.send('Oops!');
		})
	}catch(err){
		res.send('Oops!');
	}
})

app.get('/iamfeelinglucky',(req,res)=>{
	try{
		var query = req.query.q;
	}catch(err){
		var query = 'linkin park numb';
	}
	yts(query).then((r)=>{
		try{
			var youtube_url = r.results[0].video.url;
		}catch(err){
			var youtube_url = "https://www.youtube.com/watch?v=q6EoRBvdVPQ";
		}
		if(ytdl.validateURL(youtube_url)){
			res.setHeader("content-type","audio/aac");
			ytdl(youtube_url, {quality: "highestaudio", filter: "audioonly"})
				.pipe(res);
		}else{
			res.send("Oops!");
		}

	}).catch(err=>{
		res.send("Oops!");
	});
})

app.listen(process.env.PORT||5000,()=>{
	console.log("Listening to port",process.env.PORT||5000);
});
