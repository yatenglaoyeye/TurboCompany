/**
 * Notes: 日程控制模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-01-22 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const DayModel = require('../../model/day_model.js');
const AdminDayService = require('../../service/admin/admin_day_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminDayController extends BaseProjectAdminController {




	/** 日程列表 */
	async getDayList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			name: 'string',
			start: 'string',
			end: 'string',
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminDayService();
		let result = await service.getDayList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].DAY_ADD_TIME = timeUtil.timestamp2Time(list[k].DAY_ADD_TIME);

		}
		result.list = list;
		return result;
	}

	/** 删除日程 */
	async delDay() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);
		let service = new AdminDayService();
		await service.delDay(input.id);


	}


	/************** 日程数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async dayDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminDayService();

		if (input.isDel === 1)
			await service.deleteDayDataExcel(); //先删除 

		return await service.getDayDataURL();
	}

	/** 导出数据 */
	async dayDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			start: 'string|name=导出条件',
			end: 'string|name=导出条件',
			name: 'string|name=导出条件',
			fields: 'array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminDayService();
		return await service.exportDayDataExcel(input.start, input.end, input.name, input.fields);
	}

	/** 删除导出的日程数据 */
	async dayDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminDayService();
		return await service.deleteDayDataExcel();
	}
}

module.exports = AdminDayController;