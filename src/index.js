function deepClone(source){
  if (source instanceof Object){
    // const a = { name: "方方", child: {name: "小方方"}}
    let dist;
    if(source instanceof Array){
      dist = new Array();

    } else if(source instanceof Function){
      dist = function() {
        return source.apply(this, arguments)
      }
    } else{
      dist = new Object();
    }
    for(let key in source){
      dist[key] = deepClone(source[key]);
    }
    return dist;
  }
  return source
}

module.exports = deepClone;
