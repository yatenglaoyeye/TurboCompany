/**
 * Notes: 收藏实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-05-24 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class DayModel extends BaseProjectModel {

}

// 集合名
DayModel.CL = BaseProjectModel.C('day');

DayModel.DB_STRUCTURE = {
	_pid: 'string|true',
	DAY_ID: 'string|true',

	DAY_USER_ID: 'string|true',
	DAY_DATE: 'string|true|comment=日期',
	DAY_DEPT: 'string|false|comment=部门', 

	DAY_TYPE: 'int|true|default=1|comment=动态类型 0=请假,1=出差,2=在公司,9=其他',

	// 请假
	DAY_METHOD: 'string|false|comment=请假类型',

	//出差
	DAY_AREA: 'array|true|default=[]|comment=出差地点',
	DAY_PROVINCE: 'string|false|comment=出差省份',

	DAY_DESC: 'string|false|comment=事由备注',

	DAY_ADD_TIME: 'int|true',
	DAY_EDIT_TIME: 'int|true',
	DAY_ADD_IP: 'string|false',
	DAY_EDIT_IP: 'string|false',
};

// 字段前缀
DayModel.FIELD_PREFIX = "DAY_";

module.exports = DayModel;