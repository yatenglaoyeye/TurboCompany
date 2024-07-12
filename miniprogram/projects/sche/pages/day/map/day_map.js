const echarts = require('../status/echarts/echarts.js');
const geoJson = require('../status/echarts/mapData.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const helper = require('../../../../../helper/helper.js');
const timeHelper = require('../../../../../helper/time_helper.js');
const dataHelper = require('../../../../../helper/data_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const projectSetting = require('../../../public/project_setting.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		showCalModal: false,
		date: timeHelper.time('Y-M-D'),

		showDeptModal: false,
		dept: '全部',
		type: '1',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
	//	if (!await PassportBiz.loginMustBackWin(this)) return;

		this._setDateShow();

		let deptList = dataHelper.deepClone(projectSetting.DEPT_OPTIONS);
		deptList.unshift('全部');
		this.setData({ deptList });

		this._loadDetail();
	},

	bindTypeTap: async function (e) {
		let type = pageHelper.dataset(e, 'type');
		this.setData({
			type
		}, async () => {
			await this._loadDetail();
		})
	},

	_setDateShow() {
		let date = this.data.date;
		let week = timeHelper.week(date).replace('周', '星期');
		let day = timeHelper.timestamp2Time(timeHelper.time2Timestamp(date), 'Y年M月D日');
		this.setData({ dateShow: day + ' ' + week });
	},

	_fmtUserList: function () {
		if (this.data.dept != '全部') {
			return;
		}

		// 按部门整理数据
		const DEPT_OPTIONS = projectSetting.DEPT_OPTIONS;
		let dataUserData = this.data.dataUserData;
		let arr = [];
		for (let k = 0; k < DEPT_OPTIONS.length; k++) {

			let node = {
				cnt: 0,
				val: 0,
				key: DEPT_OPTIONS[k]
			}
			for (let j = 0; j < dataUserData.length; j++) {
				if (DEPT_OPTIONS[k] == dataUserData[j].key) {
					node.cnt = dataUserData[j].cnt;
					node.val = dataUserData[j].val;
					break;
				}
			}
			arr.push(node);
		}
		this.setData({ dataUserData: arr });
	},

	_loadDetail: async function () {
		try {
			let params = {
				date: this.data.date,
				dept: this.data.dept == '全部' ? '' : this.data.dept,
				type: this.data.type
			}
			let options = {
				title: this.data.isLoad ? '加载中' : 'bar'
			}

			await cloudHelper.callCloudSumbit('stat/all', params, options).then(res => {
				this.setData({
					...res.data,
					isLoad: true
				}, () => {
					if (this.data.type == 1) this.init(this.data.dataProvinceData, this.data.dataProvinceMax);
					this._fmtUserList();
				});

			});
		}
		catch (err) {
			console.error(err);
		}
	},

	/**
 * 生命周期函数--监听页面初次渲染完成
 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	async onPullDownRefresh() {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},

	bindCalClickCmpt: function (e) {
		let date = e.detail.day;
		this.setData({
			date,
			showCalModal: false
		}, () => {
			this._setDateShow();
			this._loadDetail();
		});
	},

	// 初始化中国地图
	init: function (chartData, max) {
		this.chartComponnet = this.selectComponent('#mychart');
		let myChart = null;
		this.chartComponnet.init((canvas, width, height, dpr) => {

			myChart = echarts.init(canvas, null, {
				width: width,
				height: height,
				devicePixelRatio: dpr
			});
			echarts.registerMap('china', geoJson); // 绘制中国地图
			myChart.setOption(this.getChartOption(chartData, max));
			return myChart;
		});
	},

	getChartOption: function (chartData, maxLimit) {
		let option = {
			tooltip: {
				trigger: 'item',
				formatter: function (e) {
					// console.log(e)
					let name = e.name ? e.name : '获取中';
					let value = helper.isDefined(e.value) ? e.value + '人' : '暂无数据'
					return `${name}:\n${value}`
				}
			},
			title: {
				text: '出差地图',
				subtext: '',
				textStyle: {
					color: '#5484F0',
					fontSize: 14
				},
				x: 'center'
			},
			// 地理坐标系组件
			geo: [{
				type: "map", //图表类型
				mapType: 'china', //和注册地图的名称相同
				roam: false,
				aspectScale: 0.8, // 比例 
				zoom: 1.23,
				layoutCenter: ["50%", "43%"], // 设置地图中心点,值为经纬度
				layoutSize: 340, // 地图大小，保证了不超过 370x370 的区域
				label: {
					// 图形上的文本标签
					normal: {
						show: true,
						textStyle: {
							color: "rgba(0, 0, 0, 0.9)",
							fontSize: '8'
						}
					},
					emphasis: { // 高亮时样式
						color: "#333"
					}
				},
				itemStyle: {
					// 图形上的地图区域
					normal: {
						borderColor: "rgba(0,0,0,0.2)",
						areaColor: "#005dff"
					},
					emphasis: {
						areaColor: "#38BC9D", //鼠标选择区域颜色
						areaColor: 'red',
						shadowOffsetX: 0,
						shadowOffsetY: 0,
						shadowBlur: 20,
						borderWidth: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				}
			}],
			//图例
			visualMap: {
				min: 0,
				max: maxLimit ? maxLimit : 1000,
				text: ['', ''], //文字高点低点
				realtime: false,
				calculable: true,
				textStyle: {
					color: '#86909C',
					fontSize: 10
				},
				inRange: {
					color: ['#AEDBF0', '#8CB9FD', '#4AA1CC', '#014DA1']
				},
				itemWidth: 10,
				itemHeight: 40
			},

			series: [{ //数据 这个有效,geo无效
				name: '人员动态',
				type: 'map', //图表类型
				mapType: 'china',
				roam: false,
				zoom: 1.2,
				color: "#ffffff",
				// selectedMode: 'multiple',
				label: {
					normal: {
						show: true,
						color: "#ffffff", //区域文字颜色
						fontSize: 8, //区域文字大小
					},
					emphasis: {
						show: true
					}
				},
				itemStyle: {
					normal: {
						borderColor: '#ffffff', //区域边框
						areaColor: '#000000',
					},
					emphasis: {
						areaColor: '#38BC9D',
						borderWidth: 0
					}
				},
				data: chartData
			}]
		};
		return option;
	},

	bindCloseCalModalTap: function () {
		this.setData({ showCalModal: false })
	},

	bindOpenCalModalTap: function () {
		this.setData({ showCalModal: true })
	},

	bindCloseDeptModalTap: function () {
		this.setData({ showDeptModal: false })
	},

	bindOpenDeptModalTap: function () {
		this.setData({ showDeptModal: true })
	},

	bindDeptTap: function (e) {
		let dept = pageHelper.dataset(e, 'dept');
		this.setData(
			{ dept, showDeptModal: false }
			, () => {
				this._loadDetail();
			});
	},

	url: function (e) {
		pageHelper.url(e, this);
	}
})