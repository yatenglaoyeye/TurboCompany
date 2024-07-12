const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');
const timeHelper = require('../../../helper/time_helper.js');

class DayBiz extends BaseBiz {

	/** 表单初始化相关数据 */
	static initFormData(id = '') {

		return {
			id,

			fields: projectSetting.DAY_FIELDS,

			checkType0: false,
			checkType1: false,
			checkType2: true,
			checkType9: false,

			// 表单数据   
			formDays: [timeHelper.time('Y-M-D', 86400), timeHelper.time('Y-M-D', 86400)],
			formType: 2,

			// 请假
			formMethod: '', 

			// 出差
			formArea: [],

			formDesc0: '',
			formDesc1: '',
			formDesc2: '',
			formDesc9: '',

		}

	}

}

/** 表单校验    */
DayBiz.CHECK_FORM = {
	days: 'formDays|array|must',
	type: 'formType|int|must|name=类型',
	area: 'formArea|array|name=出差地点',
	desc: 'formDesc|must|string|name=事由/备注',
	forms: 'formForms|array|name=表单',

};

module.exports = DayBiz;