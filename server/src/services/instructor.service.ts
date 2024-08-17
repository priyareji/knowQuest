import { IAssignment } from "../models/Assignment";
import { BookDocument } from "../models/Book";
import { IChapter } from "../models/Chapter";
import { ISection, SectionDocument } from "../models/Section";
import { IUnit, Unit } from "../models/Unit";
import { IVideo } from "../models/Video";
import { InstructorRepository } from "../repository/instructorRepository";

export class InstructorService {
    private instructorRepository:InstructorRepository
    constructor(){
        this.instructorRepository = new InstructorRepository()
    }

    async createUnit(unitData:IUnit){
        return await this.instructorRepository.createUnit(unitData)
    }
    async getUnitsBySubjectId(subjectId:string):Promise<IUnit[]>{
        return this.instructorRepository.findUnitBySubjectId(subjectId);
    }
    async createChapter(chapterData:Partial<IChapter>):Promise<IChapter>{
        return await this.instructorRepository.createChapter(chapterData);
    }
    async createSection(sectionData:Partial<SectionDocument>):Promise<SectionDocument>{
        return await this.instructorRepository.createSection(sectionData);
      }
      async createBook(bookData: Partial<BookDocument>): Promise<BookDocument> {
        return await this.instructorRepository.createBook(bookData);
      }
      async createVideo(videoData: IVideo): Promise<IVideo> {
        return this.instructorRepository.createVideo(videoData);
      }
      async getChaptersByUnitId(unitId: string): Promise<IChapter[]> {
        try {
          return await this.instructorRepository.getChaptersByUnitId(unitId);
        } catch (error) {
          throw new Error(`Error in service while fetching chapters by unit ID`);
        }
      } 
      async getSectionsByChapterId(chapterId: string): Promise<ISection[]> {
        try {
          return await this.instructorRepository.getSectionsByChapterId(chapterId);
        } catch (error) {
          throw new Error(`Error in service while fetching sections by chapter ID`);
        }
      }
      async getAssignmentByInstructorId(id:string):Promise<IAssignment[]>{
        try{
          return await this.instructorRepository.getAssignmentByInstructorId(id);
        } catch (error) {
          throw new Error(`Error in service while fetching sections by chapter ID`);
        }
      }
      async createAssignment(assignment:IAssignment):Promise<IAssignment>{

        // const assignmentexit = this.instructorRepository.findAssignmentByName(assignment.assignmentName)
        // if(assignmentexit){

        // }
        return this.instructorRepository.createAssignment(assignment)
      }

}