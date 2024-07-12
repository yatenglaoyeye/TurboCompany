/**
 * Notes: 预约模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2021-12-10 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const DayService = require('../service/day_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class DayController extends BaseProjectController {

	async clearMyDay() {

		// 数据校验
		let rules = {
			date: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		await service.clearMyDay(this._userId, input.date);
	}

	async getMyDay() {

		// 数据校验
		let rules = {
			date: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		return await service.getMyDay(this._userId, input.date);
	}

	async getCurrentDayList() {

		// 数据校验
		let rules = {
			type: 'must|int|default=99',
			date: 'must|date|name=日期',
			level: 'string',
			dept: 'string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		input.type = 99;
		let list = await service.getAllDayList(input);

		for (let k = 0; k < list.list.length; k++) {
			list.list[k].DAY_AREA = list.list[k].DAY_AREA.join(' - ');
		}
		let list1 = await service.getAllNotDayList(input);
		let xList = [...list.list, ...list1.list];

		return { list: xList }

	}


	async getAllDayList() {
 
		// 数据校验
		let rules = {
			type: 'must|int|default=99',
			date: 'must|date|name=日期',
			level: 'string',
			dept: 'string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		let list = await service.getAllDayList(input);
		for (let k = 0; k < list.list.length; k++) {
			if (list.list[k].DAY_AREA)
				list.list[k].DAY_AREA = list.list[k].DAY_AREA.join('-');
		}
		return list;

	}

	async getAllNotDayList() {

		// 数据校验
		let rules = {
			date: 'must|date|name=日期',
			level: 'string',
			dept: 'string',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		let list = await service.getAllNotDayList(input);
		return list;

	}

	/** 按天获取我的动态 */
	async getDayListByDay() {

		// 数据校验
		let rules = {
			day: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		let list = await service.getDayListByDay(this._userId, input.day);
		for (let k = 0; k < list.length; k++) {
			list[k].DAY_AREA = list[k].DAY_AREA.join('-');
		}
		return list;


	}

	/** 获取从某天开始我的动态 */
	async getDayHasDaysFromDay() {

		// 数据校验
		let rules = {
			day: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		let list = await service.getDayHasDaysFromDay(this._userId, input.day);
		return list;

	}

	async delDay() {
		// 数据校验
		let rules = {
			id: 'id|must'
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		return await service.delDay(this._userId, input.id);
	}

	async insertDay() {
		// 数据校验
		let rules = {
		 

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		return await service.insertDay(this._userId, input);
	}

	async editDay() {
		// 数据校验
		let rules = {
		 

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		return await service.editDay(this._userId, input);
	}

	async getDetail() {
		// 数据校验
		let rules = {
			id: 'id|must',

		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new DayService();
		return await service.getDetail(input.id);
	}

}

module.exports = DayController;