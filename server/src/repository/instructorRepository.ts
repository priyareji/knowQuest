import { Assignment, IAssignment } from "../models/Assignment";
import { Book, BookDocument } from "../models/Book";
import { Chapter, IChapter } from "../models/Chapter";
import { ISection, Section, SectionDocument } from "../models/Section";
import { IUnit,Unit } from "../models/Unit"
import { IVideo, Video } from "../models/Video";

export class InstructorRepository{


  async createUnit(unitData:Partial<IUnit>):Promise<IUnit>{
    const unit =new Unit(unitData)
    return await unit.save();
  }

  async findUnitBySubjectId(subjectId:string):Promise<IUnit[]>{
    return Unit.find({subjectId}).exec();
  }

  async createChapter(chapterData:Partial<IChapter>):Promise<IChapter>{
    const chapter =new Chapter(chapterData)
    return await chapter.save();
  }

  async createSection(sectionData:Partial<SectionDocument>):Promise<SectionDocument>{
    const section = new Section(sectionData);
    return await section.save();
  }

async createBook(bookData: Partial<BookDocument>): Promise<BookDocument> {
    const book = new Book(bookData);
    return await book.save();
  }
  
  async createVideo(videoData: IVideo): Promise<IVideo> {
    const video = new Video(videoData);
    return video.save();
  }
  async getChaptersByUnitId(unitId: string): Promise<IChapter[]> {
    try {
      return await Chapter.find({ unitId });
    } catch (error) {
      throw new Error(`Error fetching chapters by unit ID`);
    }
  }
  async getSectionsByChapterId(chapterId: string): Promise<ISection[]> {
    try {
      return await Section.find({ chapterId });
    } catch (error) {
      throw new Error(`Error fetching sections by chapter ID`);
    }
  }
  async getAssignmentByInstructorId(id:string):Promise<IAssignment[]>{
  
      try {
        return await  Assignment.find({ instructorId:id });
      } catch (error) {
        throw new Error(`Error fetching assignment by instructor ID`);
      }
  }
async createAssignment(assignment:IAssignment):Promise<IAssignment>{
  try{
  return await Assignment.create(assignment)
  }
  catch(error){
    throw new Error(`Error creating in assignment`);
  }
}

}







