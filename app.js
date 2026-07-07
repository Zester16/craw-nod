/** 
The purpose of this backend is to parse a particular site to scrap necessary data
 */


const express = require("express")
const app = express()
const port = process.env.PORT || 3002;


const { webkit } = require('playwright');


//#TODO: Modularize system by moving this function to services
async function getBqPrimeTopOfMorningNewsletterV1() {
	//old url kept for backup
	//let url = "https://www.ndtvprofit.com/topic-load-more/from/allnews/type/news/page/1/query/All-You-Need-To-Know-Going-Into-Trade"
	//second url for backup. As on 07-07-2026
	//let url = "https://www.ndtvprofit.com/search?searchtext=Stock-Market-Today:-All-You-Need-To-Know"

	let url="https://www.ndtvprofit.com/search?searchtext=All%20you%20need%20to%20know%20going%20into%20trade"
	const browser = await webkit.launch();
	const page = await browser.newPage();
	await page.goto(url);

	const returnArray = []
	//const headers = await page.headers()
	//const links = await page.locator('a');
	const divs = await page.locator('.SrchLstPg_ttl');
	for (let i = 0; i < await divs.count(); i++) {
		const url = await divs.nth(i).getAttribute('href')
		const title = await divs.nth(i).allTextContents()
		returnArray.push({ url: url, title: title[0] })
		console.log();
		console.log("***")
	}
	await browser.close();
	return returnArray
}

app.get("/api/v1/bqprime-newsletter", async (req, rep) => {

	const response = await getBqPrimeTopOfMorningNewsletterV1()
	rep.send(response)
})

app.listen(port, () => {
	console.log(`port ${port} for sabNL up and running`)
})




