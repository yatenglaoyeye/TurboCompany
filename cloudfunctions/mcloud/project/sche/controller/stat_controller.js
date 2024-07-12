/**
 * Notes: 统计模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-12-10 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const StatService = require('../service/stat_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class StatController extends BaseProjectController {

	async statAll() {

		// 数据校验
		let rules = {
			date: 'must|date|name=日期',
			dept: 'string',
			type: 'int|must',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new StatService();
		let ret = await service.statAll(input.date, input.dept, input.type);
		return ret;

	}



}

module.exports = StatController;