/**
 * 公用dom js操作方法
 * */



/**
 * 给el对象添加class
 * */
export function addClass(el,className){
  //判断是否含有className
  if(hasCLass(el,className)){
    return
  }

  let newCLass = el.className.split(' ');
  newCLass.push(className);
  el.className=newCLass.join(' ');
}

/**
 * 判断el中是否含有className
 * */
export function hasCLass(el,className){
  let reg = new RegExp('(^/\\s)'+className+'(\\s/$)');
  return reg.test(el.className);
}
