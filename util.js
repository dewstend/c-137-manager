const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page * limit) - limit : 0;

  return { limit, offset };
};

const getPagingData = (page, count, limit, req) => {
  const pages = Math.ceil(count / limit);
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  
  const prev = (page>1 && page<pages+1) ? page-1 : null;
  const next = (page<pages) ? page+1 : null;
  
  let prevUrl, nextUrl;

  if(fullUrl.includes('?')) {
  	if(fullUrl.includes('page=')) {
  		prevUrl = (prev) ? fullUrl.replace(/(page=)\d+/, `$1${prev}`) : prev;
  		nextUrl = (next) ? fullUrl.replace(/(page=)\d+/, `$1${next}`) : next;
  	} else {
  		prevUrl = (prev) ? fullUrl.replace(/\?/, `\?page=${prev}&`) : prev;
  		nextUrl = (next) ? fullUrl.replace(/\?/, `\?page=${next}&`) : next;
  	}
  } else {
  	prevUrl = (prev) ? fullUrl+`?page=${prev}` : prev;
  	nextUrl = (next) ? fullUrl+`?page=${next}` : next;
  }

  return {pages, prev: prevUrl, next: nextUrl};
};


module.exports = {
	getPagination,
	getPagingData
}