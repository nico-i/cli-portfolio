export class Skill {
  name: string;
  proficiency: number;
  description: string;
  constructor(name: string, proficiency: number, description: string) {
    this.name = name;
    this.proficiency = proficiency;
    this.description = description;
  }
}
