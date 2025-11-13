import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => Int, {
    nullable: true,
    description: 'ID of the post this comment belongs to (optional)',
  })
  postId?: number;

  @Field(() => String, { description: 'Content of the comment' })
  content: string;
}
