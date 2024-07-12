/**
 * Notes: 日程管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-01-22  07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');

const util = require('../../../../framework/utils/util.js');
const exportUtil = require('../../../../framework/utils/export_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const DayModel = require('../../model/day_model.js');
const UserModel = require('../../model/user_model.js');

// 导出日程数据KEY
const EXPORT_DAY_DATA_KEY = 'EXPORT_DAY_DATA';

class AdminDayService extends BaseProjectAdminService { 

	/** 取得日程分页列表 */
	async getDayList({
		name = '',
		start = '',
		end = '',
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0
	}) {

		orderBy = orderBy || {
			DAY_DATE: 'desc',
			DAY_ADD_TIME: 'desc'
		};
		let fields = '*';


		let where = {};
		where.and = {
			_pid: this.getProjectId() //复杂的查询在此处标注PID
		};

		if (name) {
			where.and['user.USER_NAME'] = ['like', name];
		}

		if (start && !end) {
			where.and.DAY_DATE = ['>=', start]
		}
		else if (end && !start) {
			where.and.DAY_DATE = ['<=', end]
		}
		else if (start && end) {
			where.and.DAY_DATE = [['>=', start], ['<=', end]];
		}

		let joinParams = {
			from: UserModel.CL,
			localField: 'DAY_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};
 
		let result = await DayModel.getListJoin(joinParams, where, fields, orderBy, page, size, true, oldTotal, false);


		// 为导出增加一个参数condition
		result.condition = encodeURIComponent(JSON.stringify(where));

		return result;
	}



	/**删除日程 */
	async delDay(id) {
		let whereDay = {
			_id: id
		}

		// ** 删除日程记录
		await DayModel.del(whereDay);

	}

	// #####################导出日程数据

	/**获取日程数据 */
	async getDayDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_DAY_DATA_KEY);
	}

	/**删除日程数据 */
	async deleteDayDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_DAY_DATA_KEY);
	}

	/**导出日程数据 */
	async exportDayDataExcel(start, end, name, fields) {

		this.AppError('[行程]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

}

module.exports = AdminDayService;