/**
 * Notes: 收藏模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-05-24 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const util = require('../../../framework/utils/util.js');
const DayModel = require('../model/day_model.js');
const UserModel = require('../model/user_model.js');

class DayService extends BaseProjectService {

	// 获取我的今日动态
	async getMyDay(userId, date) {
		let where = {
			DAY_USER_ID: userId,
			DAY_DATE: date
		};
		let day = await DayModel.getOne(where);
		return day;
	}

	// 清空未来动态
	async clearMyDay(userId, date) {
		this.AppError('[行程]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	/** 取得动态总列表 type=99代表所有*/
	async getAllDayList({ date, level, type, dept }) {

		type = Number(type);

		let orderBy = {
			'user.USER_LEVEL': 'desc',
			DAY_TYPE: 'asc',
			DAY_DATE: 'desc',
			DAY_ADD_TIME: 'desc'
		};
		let fields = 'DAY_DATE,DAY_USER_ID,DAY_ADD_TIME,DAY_DESC,DAY_AREA,DAY_TYPE,DAY_METHOD,user.USER_MOBILE,user.USER_PIC,user.USER_NAME,user.USER_OBJ,user.USER_LEVEL,user.USER_MINI_OPENID';
		let where = {
			DAY_DATE: date
		};
		if (util.isDefined(level)) where['user.USER_LEVEL'] = Number(level);
		if (type != 99) where['DAY_TYPE'] = type;

		if (dept)
			where['user.USER_OBJ.dept'] = dept;


		let joinParams = {
			from: UserModel.CL,
			localField: 'DAY_USER_ID',
			foreignField: 'USER_MINI_OPENID',
			as: 'user',
		};

		let ret = await DayModel.getListJoin(joinParams, where, fields, orderBy, 1, 1000);
  

		return ret;

	}


	// 取得所有未填写的
	async getAllNotDayList({ date, level, dept }) {

		 
	}

	async getDetail(id) {
		return DayModel.getOne(id);
	}

	async insertDay(
	) { 
		this.AppError('[行程]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async editDay() {

		this.AppError('[行程]该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	async delDay(userId, id) {
		this.AppError('[行程]该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}


	/** 按天获取我的动态 */
	async getDayListByDay(userId, date) {
		let where = {
			DAY_USER_ID: userId,
			DAY_DATE: date,
		};

		let orderBy = {
			'DAY_ADD_TIME': 'desc'
		};

		let fields = '*';

		let list = await DayModel.getAll(where, fields, orderBy);
		return list;
	}

	/**
	 * 获取从某天开始的我的动态
	 * @param {*} fromDay  日期 Y-M-D
	 */
	async getDayHasDaysFromDay(userId, fromDay) {
		fromDay = timeUtil.time2Timestamp(fromDay) - 86400 * 1000 * 50;
		fromDay = timeUtil.timestamp2Time(fromDay, 'Y-M-D');
		let where = {
			DAY_DATE: ['>=', fromDay],
			DAY_USER_ID: userId,
		};

		let fields = 'DAY_DATE';
		let list = await DayModel.getAllBig(where, fields);

		let retList = [];
		for (let k = 0; k < list.length; k++) {
			let day = list[k].DAY_DATE;
			if (!retList.includes(day)) retList.push(day);
		}
		return retList;
	}

}

module.exports = DayService;