import { UniqueEntityID } from "../../domain/UniqueEntityID";


export interface IDomainEvent {
    dateTimeOccurred: Date;
    getAggregateId(): UniqueEntityID;
}