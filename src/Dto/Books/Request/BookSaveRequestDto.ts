export class BookSaveRequestDto {
  bookid?: string;
  bookName!: string;
  author!: AuthorDto;
  publicationYear!: Date;
  isbn!: string;
}

export class AuthorDto {
  authorId?: string;
  authorName!: string;
}
