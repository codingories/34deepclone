class DeepCloner {
  constructor(){
    this.cache = [];
  }
  clone(source){
    if (source instanceof Object){
      let cachedDist = this.findCache(source);
      if(cachedDist){
        console.log('有缓存')
        return cachedDist;
      }else {
        console.log('没缓存')
        let dist;
        if(source instanceof Array){
          dist = new Array();
        } else if(source instanceof Function){
          dist = function() {
            return source.apply(this, arguments)
          }
        } else if(source instanceof RegExp){
          dist = new RegExp(source.source, source.flags)
        } else if(source instanceof Date){
          dist = new Date(source);
        } else{
          dist = new Object();
        }
        this.cache.push([source,dist])
        for(let key in source){ // 尽量少用for in, for in可能会复制本身不想复制的属性
          if (source.hasOwnProperty(key)){
            dist[key] = this.clone(source[key]);
          }
        }
        return dist;
      }
    }
    return source
  }
  findCache(source){
    for(let i=0; i<this.cache.length;i++){
      if(this.cache[i][0] === source){
        return this.cache[i][1];
      }
    }
    return undefined
  }
}






module.exports = DeepCloner;
