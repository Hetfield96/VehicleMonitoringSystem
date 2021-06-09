export default class Report {
	public static getStandardTemplates() {
		const language = localStorage.getItem("language");
		if (language === 'ru') {
			return [
				new Report(1, 'Все данные'),
				new Report(2, 'Рабочее время')
			]
		}
		return [
			new Report(1, 'All data'),
			new Report(2, 'Vehicle working time')
		]
	}

	public id: number;
	public name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
