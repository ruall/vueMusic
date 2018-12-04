/**
 * 获取歌手列表接口
 * */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getSingerList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  const data = Object.assign({}, commonParams, {
    format: 'jsonp',
    notice: 0,
    hostUin:0,
    needNewCode:0,
    platform:'yqq',
    g_tk:5381,
    callback:'getUCGI036634340690312905',
    jsonpCallback:'getUCGI036634340690312905',
    data:'{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  });
  return jsonp(url,data,options);
}
