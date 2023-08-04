export class BookResponseDto {
  books?: Book[];
}

export class Book {
  bookId!: string;
  bookName!: string;
  bookUrl!: string;
  isbn!: string;
  publicationYear!: Date;
  author!: Author;
}

export class Author {
  authorId: string | undefined;
  authorName!: string;
}
