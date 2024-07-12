/**
 * Notes: 工作流模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2024-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');
const pageHelper = require('../../../helper/page_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');

class FlowBiz extends BaseBiz {

	static async loadDetail(that) {
		let id = that.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let flow = await cloudHelper.callCloudData('flow/detail', params, opt);
		if (!flow) {
			that.setData({
				isLoad: null
			})
			return;
		}

		that.setData({
			isLoad: true,
			flow,
		});

	}


	static initFormData(id = '', step = 1) {
		return {
			id,
			fields: projectSetting['FLOW_FIELDS' + step],
		}
	}


	static async delFlow(id, callback) {
		let cb = async () => {
			try {
				let params = {
					id
				}
				let opts = {
					title: '删除中'
				}

				await cloudHelper.callCloudSumbit('flow/del', params, opts).then(res => {
					pageHelper.showSuccToast('删除成功', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认删除? 删除不可恢复', cb);
	}
}

FlowBiz.CHECK_FORM = {
	forms: 'formForms|array',
};

module.exports = FlowBiz;