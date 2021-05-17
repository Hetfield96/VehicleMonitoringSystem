export default class Report {
	public static getStandardTemplates() {
		return [
			new Report(1, 'All data')
		]
	}

	public id: number;
	public name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
