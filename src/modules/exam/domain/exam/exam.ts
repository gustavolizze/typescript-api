import { Entity, EntityStatus, UniqueEntityId } from 'common/domain';
import { ExamName } from 'modules/exam/domain/exam-name';
import { ExamType } from 'modules/exam/domain/exam-type';

interface ExamProps {
  name: ExamName;
  type: ExamType;
  status: EntityStatus;
}

export class Exam extends Entity<ExamProps> {
  get name() {
    return this.props.name.value;
  }

  get type() {
    return this.props.type.value;
  }

  get status() {
    return this.props.status.value;
  }

  static create(props: ExamProps, id?: UniqueEntityId) {
    return new Exam(props, id);
  }
}
