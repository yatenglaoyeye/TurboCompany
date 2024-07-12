/**
 * Notes: 统计模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-02-24 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const DayModel = require('../model/day_model.js');
const UserModel = require('../model/user_model.js');

const PROVINCE = '河北,山西,辽宁,吉林,黑龙江,江苏,浙江,安徽,福建,江西,山东,河南,湖北,湖南,广东,海南,四川,贵州,云南,陕西,甘肃,青海,台湾,内蒙古,广西,西藏,宁夏,新疆,北京,天津,上海,重庆,香港,澳门,南海诸岛';

class StatService extends BaseProjectService {

	// 某部门所有状态统计
	async statAll(date, dept, type) { 

		let dataInfo = await this.statType(date, dept);
		let dataProvince = await this.statArea(date, dept, type);
		return { dataInfo, ...dataProvince };
	}

	// 按日程类型统计人数比例
	async statType(date, dept) {
		let total = 0;
		let where = {
			DAY_DATE: date
		};
		if (dept) {
			// 总人数
			total = await UserModel.count({ 'USER_OBJ.dept': dept, USER_STATUS: UserModel.STATUS.COMM });
			where.DAY_DEPT = dept;
		}
		else {
			// 总人数
			total = await UserModel.count({ USER_STATUS: UserModel.STATUS.COMM });
		}

		// 请假
		where.DAY_TYPE = 0;
		let totalType0 = await DayModel.count(where);

		// 出差
		where.DAY_TYPE = 1;
		let totalType1 = await DayModel.count(where);

		// 在公司
		where.DAY_TYPE = 2;
		let totalType2 = await DayModel.count(where);

		// 其他
		where.DAY_TYPE = 9;
		let totalType9 = await DayModel.count(where);

		// 未登记
		let totalTypeNull = total - totalType0 - totalType1 - totalType2 - totalType9;
		if (totalTypeNull < 0) totalTypeNull = 0;

		let statCnt = {
			total,
			totalType0,
			totalType0Per: dataUtil.getPercent(totalType0, total).toFixed(0),
			totalType1,
			totalType1Per: dataUtil.getPercent(totalType1, total).toFixed(0),
			totalType2,
			totalType2Per: dataUtil.getPercent(totalType2, total).toFixed(0),
			totalType9,
			totalType9Per: dataUtil.getPercent(totalType9, total).toFixed(0),

			totalTypeNull,
			totalTypeNullPer: dataUtil.getPercent(totalTypeNull, total).toFixed(0),
		}

		return statCnt;
	}

	// 按类型&省份统计人数 
	async statArea(date, dept, type) {
		type = Number(type);

		let where = {
			DAY_DATE: date,
			DAY_TYPE: 1
		};
		if (dept) where.DAY_DEPT = dept;

		let ret = await DayModel.groupCount(where, 'DAY_PROVINCE', true, 'kv');

		let provinceList = PROVINCE.split(',');

		// 省份转换
		for (let j = 0; j < ret.length; j++) {

			for (let k = 0; k < provinceList.length; k++) {
				if (ret[j].key.indexOf(provinceList[k]) > -1) {
					ret[j].key = provinceList[k];
					break;
				}
			}
		}

		let dataProvinceData = [];
		let dataProvinceMax = 0;  //最大数量

		if (type == 1) {
			// 统计地图省份
			for (let k = 0; k < provinceList.length; k++) {

				let node = {
					name: provinceList[k],
					value: 0
				};

				for (let j = 0; j < ret.length; j++) {
					if (ret[j].key.indexOf(provinceList[k]) > -1) {
						node.value = ret[j].val;

						if (node.value > dataProvinceMax) dataProvinceMax = node.value; //找出最大值

						break;
					}
				}

				dataProvinceData.push(node);
			}
		}

		let dataUserData = [];

		// 按部门统计用户 
		where = {
			DAY_DATE: date
		};
		if (dept) where.DAY_DEPT = dept;
		if (type != 99) where.DAY_TYPE = type; // 未填
		let retByRet = await DayModel.groupCount(where, 'DAY_DEPT', true, 'kv');


		if (dept)
			dataUserData = await UserModel.groupCount({ 'USER_OBJ.dept': dept, USER_STATUS: UserModel.STATUS.COMM }, 'USER_OBJ.dept', true, 'kv');
		else
			dataUserData = await UserModel.groupCount({ USER_STATUS: UserModel.STATUS.COMM }, 'USER_OBJ.dept', true, 'kv');

		for (let k = 0; k < dataUserData.length; k++) {
			if (type == 99) // 未填
				dataUserData[k].cnt = dataUserData[k].val;
			else
				dataUserData[k].cnt = 0;

			for (let j = 0; j < retByRet.length; j++) {
				if (dataUserData[k].key == retByRet[j].key) {
					if (type == 99) {
						// 未填
						dataUserData[k].cnt = dataUserData[k].val - retByRet[j].val;
						if (dataUserData[k].cnt < 0) dataUserData[k].cnt = 0;
					}
					else {
						dataUserData[k].cnt = retByRet[j].val;
					}

					break;
				}
			}
		}


		return { dataProvinceData, dataProvinceMax, dataUserData };
	}

}

module.exports = StatService;